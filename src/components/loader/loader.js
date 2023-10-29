import './loader.scss'

export const loaderRegular = () => {
    const root = document.createElement('div');

    root.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 24C11.3096 24 10.75 23.4404 10.75 22.75C10.75 22.0596 11.3096 21.5 12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 13.1009 2.68681 14.1746 3.0479 15.1883C3.27953 15.8387 2.94012 16.5537 2.28978 16.7853C1.63945 17.0169 0.924466 16.6775 0.692827 16.0272C0.236162 14.7451 0 13.3878 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24Z" fill="#919399"/>
    </svg>`

    root.classList.toggle('loader-regular');
    root.classList.toggle('rotating');

    return root;
}
