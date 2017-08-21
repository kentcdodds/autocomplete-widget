/** @jsx preact.h */
import preact from 'preact'
import Downshift from 'downshift/dist/downshift.preact.es'

const composeClassName = (...classNames) => classNames.filter(Boolean).join(' ')

function BasicAutocomplete({
  itemIdProp,
  itemDisplayProp,
  items,
  inputProps,
  ...rest
}) {
  const itemToString = i => (i ? i[itemDisplayProp] : '')
  const filter = (items, input) =>
    input
      ? items.filter(
          i =>
            i && i[itemDisplayProp].toLowerCase().includes(input.toLowerCase())
        )
      : items
  return (
    <Downshift itemToString={itemToString} {...rest}>
      {({
        getInputProps,
        getButtonProps,
        getItemProps,
        isOpen,
        toggleMenu,
        clearSelection,
        selectedItem,
        inputValue,
        highlightedIndex,
      }) =>
        <div
          className={composeClassName(
            'autocomplete-widget',
            isOpen ? 'is-open' : null
          )}
        >
          <div className="autocomplete-widget__input-wrapper">
            <input
              {...getInputProps({
                ...inputProps,
                className: composeClassName(
                  inputProps.className,
                  'autocomplete-widget__input'
                ),
              })}
            />
            {selectedItem
              ? <button
                  className="autocomplete-widget__x-icon-button"
                  onClick={clearSelection}
                  aria-label="clear selection"
                >
                  <XIcon className="autocomplete-widget__x-icon" />
                </button>
              : <button
                  {...getButtonProps({
                    className: 'autocomplete-widget__arrow-icon-button',
                  })}
                >
                  <ArrowIcon
                    isOpen={isOpen}
                    className="autocomplete-widget__arrow-icon"
                  />
                </button>}
          </div>
          {!isOpen
            ? null
            : <div className="autocomplete-widget__menu">
                {filter(items, inputValue).map((item, index) =>
                  <div
                    key={item[itemIdProp]}
                    {...getItemProps({
                      item,
                      index,
                      className: composeClassName(
                        'autocomplete-widget__item',
                        selectedItem === item
                          ? 'autocomplete-widget__item--selected'
                          : null,
                        highlightedIndex === index
                          ? 'autocomplete-widget__item--highlighted'
                          : null
                      ),
                    })}
                  >
                    {itemToString(item)}
                  </div>
                )}
              </div>}
        </div>}
    </Downshift>
  )
}

function ArrowIcon({isOpen, ...rest}) {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={16}
      fill="transparent"
      stroke="#979797"
      strokeWidth="1.1px"
      transform={isOpen ? 'rotate(180)' : null}
      {...rest}
    >
      <path d="M1,6 L10,15 L19,6" />
    </svg>
  )
}

function XIcon(props) {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={12}
      fill="transparent"
      stroke="#979797"
      strokeWidth="1.1px"
      {...props}
    >
      <path d="M1,1 L19,19" />
      <path d="M19,1 L1,19" />
    </svg>
  )
}

export default BasicAutocomplete
