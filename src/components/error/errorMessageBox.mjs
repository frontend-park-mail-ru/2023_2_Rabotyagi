export const ErrorMessageBox = (error) => {
    const root = document.createElement('div');
    const template = Handlebars.templates['errorMessageBox.hbs'];

    root.innerHTML = template({text: error});

    return root.firstChild;
}
