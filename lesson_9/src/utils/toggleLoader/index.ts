export const toggleLoader = (target: HTMLElement, loader: HTMLElement, selector: string) => {
  const targetElement = target.querySelector<HTMLElement>(selector)!;
  const isLoaderExists = targetElement.querySelector<HTMLElement>('.loader');
  if (isLoaderExists) {
    targetElement.removeChild(isLoaderExists)
  } else {
    targetElement.insertAdjacentElement('afterbegin', loader);
  }
}