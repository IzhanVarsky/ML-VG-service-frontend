import config from './config.json';
import {optimize_svg_pipeline} from "~/flatten_groups";

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

export function downloadPNGFromServer(data) {
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
      downloadBase64File("image/png", response.result.res_png1, "rasterized.png");
    },
    error: (e) => {
      console.log('ERR', e);
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

export function runVectorStyleTransfer(style_img, content_img, callback, err_callback, use_optimizing = false) {
  const formData = new FormData();
  if (use_optimizing) {
    formData.append("style_svg", optimize_svg_pipeline(style_img));
    formData.append("content_svg", optimize_svg_pipeline(content_img));
  } else {
    formData.append("style_svg", style_img);
    formData.append("content_svg", content_img);
  }
  $.ajax({
    url: `${config.vector_style_transfer_backend_host}/vector_style_transfer`,
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
      err_callback(e);
    }
  });
}