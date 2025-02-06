export function sanitizeContent(editableElement:HTMLElement) {
    editableElement.innerHTML = editableElement.innerHTML.replace(/<span[^>]*>/g, "").replace(/<\/span>/g, "");
}