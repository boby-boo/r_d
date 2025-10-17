export const toggleLoader = (target: HTMLElement, loader: HTMLElement, selector: string) => {
  const targetElement = target.querySelector<HTMLElement>(selector)!;
  const isLoaderExists = targetElement.querySelector<HTMLElement>('.loader');
  isLoaderExists ?
    targetElement.removeChild(isLoaderExists) :
    targetElement.insertAdjacentElement('afterbegin', loader);
}