export default function ChipSVGBackground({
                                            usersBackgroundColor,
                                            setUsersBackgroundColor,
                                            backgroundColor = ''
                                          }) {
  return (
    <div
      style={{
        cursor: 'pointer',
        width: '26px', height: '26px', borderRadius: '5px',
        backgroundColor: backgroundColor,
        outline: usersBackgroundColor == backgroundColor ? '3px solid #228be6' : ''
      }}
      onClick={() => setUsersBackgroundColor(backgroundColor)}>
      {backgroundColor == '' ?
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="3.5" fill="#fff" fillOpacity="0.8"></rect>
          <path
            d="M3.5 0h3v7h-7V4a4 4 0 0 1 4-4M16.5-3.5h10v10h-10zM6.5 6.5h10v10h-10zM-3.5 16.5h10v10h-10zM16.5 16.5h10v10h-10zM26.5 6.5h10v10h-10zM32.5 29v-3h-6v6h3a3 3 0 0 0 3-3M6.5 26.5h10v10h-10z"
            fill="#D9E0E3" fillOpacity="0.8"></path>
        </svg>
        :
        <></>}
    </div>
  )
}