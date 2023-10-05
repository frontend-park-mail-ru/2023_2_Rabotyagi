export default function logo() {
        const root = document.createElement('div')
        // root.style.width = 60
        // root.style.height = 60
        // root.setAttribute('viewBox', '0 0 60 60')
        // root.setAttribute('fill', 'none')
        // root.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
        root.innerHTML = `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.2903 32.2097C3.32797 31.3901 3.32797 28.6099 5.2903 27.7903L10.5806 25.5806C17.3595 22.7491 22.7491 17.3595 25.5806 10.5806L27.7903 5.29029C28.6099 3.32796 31.3901 3.32796 32.2097 5.29029L34.4194 10.5806C37.2509 17.3595 42.6405 22.7491 49.4194 25.5806L54.7097 27.7903C56.6721 28.6099 56.6721 31.3901 54.7097 32.2097L49.4194 34.4194C42.6405 37.2509 37.2509 42.6405 34.4194 49.4194L32.2097 54.7097C31.3901 56.672 28.6099 56.672 27.7903 54.7097L25.5806 49.4194C22.7491 42.6405 17.3595 37.2509 10.5806 34.4194L5.2903 32.2097Z" fill="url(#paint0_linear_58_12265)"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.09878 30.8724C3.77873 29.7807 4.23639 28.4878 5.47175 27.9718L10.762 25.762C17.541 22.9305 22.9305 17.541 25.762 10.762L27.9718 5.47175C28.7914 3.50942 31.5715 3.50942 32.3912 5.47175L34.6009 10.762C37.4324 17.541 42.8219 22.9305 49.6009 25.762L54.8912 27.9718C56.1265 28.4877 56.5841 29.7806 56.2642 30.8723C48.1936 34.0768 39.3932 35.8383 30.1813 35.8383C20.9696 35.8383 12.1692 34.0769 4.09878 30.8724Z" fill="url(#paint1_linear_58_12265)"/>
        <defs>
        <linearGradient id="paint0_linear_58_12265" x1="21.2132" y1="51.9724" x2="41.3658" y2="45.2548" gradientUnits="userSpaceOnUse">
        <stop stop-color="#9D8DF1"/>
        <stop offset="1" stop-color="#407C6C"/>
        </linearGradient>
        <linearGradient id="paint1_linear_58_12265" x1="46.7985" y1="24.5246" x2="22.8088" y2="40.8401" gradientUnits="userSpaceOnUse">
        <stop stop-color="#95F2D9"/>
        <stop offset="1" stop-color="#9D8DF1"/>
        </linearGradient>
        </defs>
        </svg>`
        return root;
};