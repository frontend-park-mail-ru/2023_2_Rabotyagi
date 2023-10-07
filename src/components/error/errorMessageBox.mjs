export const ErrorMessageBox = (error) => {
    const root = document.createElement('div');
    const text = document.createElement('p')

    root.classList = ['error'];
    text.classList = ['text-regular'];

    text.innerHTML = error;
    root.appendChild(text);

    return root;
}
