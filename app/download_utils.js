import { config } from '~/config.js';
import { optimize_svg_pipeline } from "~/flatten_groups";

export function downloadBase64File(contentType, base64Data, fileName) {
  const link = document.createElement("a");
  link.href = `data:${contentType};base64,${base64Data}`;
  link.download = fileName;
  link.click();
}

export function downloadTextFile(text, filename) {
  const link = document.createElement('a');
  link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
  link.download = filename;
  link.click();
}

export function downloadPNGFromServer(data, succCallback, errCallback) {
  const formData = new FormData()
  formData.append("svg", data);
  $.ajax({
    url: `${config.covergan_backend_host}/rasterize`,
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    cache: false,
    success: (response) => {
      console.log('SUCC', response);
      if (succCallback) {
        succCallback(response.result.res_png1)
      } else {
        downloadBase64File("image/png", response.result.res_png1, "rasterized.png");
      }
    },
    error: (e) => {
      console.log('ERR', e);
      if (errCallback) {
        errCallback(e);
      }
    }
  });
}

export function getJSON(data, callback) {
  const formData = new FormData()
  formData.append("svg", data);
  $.ajax({
    url: `${config.covergan_backend_host}/svg_to_json`,
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    cache: false,
    success: (response) => {
      console.log('SUCC', response);

      if (callback) {
        callback(response.result);
      } else {
        downloadTextFile(JSON.stringify(response.result), "obj.json");
      }
    },
    error: (e) => {
      console.log('ERR', e);
    }
  });
}

export function extractColors(image, n, callback, callback_err) {
  const formData = new FormData()
  formData.append("img", image);
  formData.append("color_count", n);
  formData.append("algo_type", 1);
  formData.append("use_random", false);
  $.ajax({
    url: `${config.covergan_backend_host}/extract_colors`,
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    cache: false,
    success: (response) => {
      console.log('COLORS:', response);
      const colors = response.result.map(([r, g, b]) => `rgb(${r}, ${g}, ${b})`)
      callback(colors);
    },
    error: (e) => {
      if (callback_err !== undefined) {
        callback_err(e)
      }
      console.log('ERR', e);
    }
  });
}

export function runVectorStyleTransfer(content_img, style_img, styleMimeType,
                                       modelParams,
                                       succCallback, errCallback,
                                       use_optimizing = false) {
  const formData = new FormData();
  if (use_optimizing) {
    formData.append("content_svg", optimize_svg_pipeline(content_img));
    formData.append("style", optimize_svg_pipeline(style_img));
  } else {
    formData.append("content_svg", content_img);
    formData.append("style", style_img);
  }
  formData.append("style_mime_type", styleMimeType);
  formData.append("iter_num", modelParams.iterationsNumber);
  formData.append("is_lr_default", modelParams.learningRateIsDefault);
  formData.append("lr_point", modelParams.lrPoint);
  formData.append("lr_color", modelParams.lrColor);
  formData.append("lr_stroke_width", modelParams.lrStroke);
  formData.append("contour_loss_weight", modelParams.contourLoss);
  formData.append("perception_loss_weight", modelParams.perceptionLoss);
  formData.append("style_loss_weight", modelParams.styleLoss);
  formData.append("content_loss_weight", modelParams.contentLoss);
  formData.append("xing_loss_weight", modelParams.xingLoss);
  formData.append("optimize_opacity", modelParams.optimizeOpacity);
  formData.append("init_type", modelParams.initType);
  formData.append("init_num_paths", modelParams[modelParams.initType].num_paths);
  formData.append("init_min_num_segments", modelParams[modelParams.initType].min_num_segments);
  formData.append("init_max_num_segments", modelParams[modelParams.initType].max_num_segments);
  formData.append("init_radius", modelParams[modelParams.initType].radius);
  formData.append("init_stroke_width", modelParams[modelParams.initType].stroke_width);
  formData.append("max_stroke_width", modelParams.maxStrokeWidth);
  formData.append("alpha_blending_method", modelParams.ABMethod);
  formData.append("alpha_blending_coef", modelParams.ABCoef);

  $.ajax({
    url: `${config.vector_style_transfer_backend_host}/vector_style_transfer`,
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    timeout: 500_000,
    cache: false,
    success: (response) => {
      console.log('SUCC', response);
      succCallback(response.result.res_svg);
    },
    error: (e) => {
      console.log('ERR', e);
      errCallback(e);
    }
  });
}

export function diffvg_optimize(data, callback, error_callback) {
  const formData = new FormData()
  formData.append("svg", data);
  $.ajax({
    url: `${config.covergan_backend_host}/diffvg_optimize`,
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    cache: false,
    success: (response) => {
      console.log('SUCC', response);
      callback(response.result.res_svg);
    },
    error: (e) => {
      console.log('ERR', e);
      error_callback();
    }
  });
}