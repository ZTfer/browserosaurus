import { faStar } from '@fortawesome/pro-solid-svg-icons/faStar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cc from 'classcat'
import React, { useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { browsersAtom, favBrowserIdAtom, openMenuAtom } from '../atoms'
import { selectFav } from '../sendToMain'

const TheFavMenu: React.FC = () => {
  const browsers = useRecoilValue(browsersAtom)
  const favBrowserId = useRecoilValue(favBrowserIdAtom)
  const setOpenMenu = useSetRecoilState(openMenuAtom)

  const handleFavChange = useCallback(
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.MouseEvent<HTMLInputElement, MouseEvent>,
    ) => {
      selectFav(event.currentTarget.value)
      setOpenMenu(false)
    },
    [setOpenMenu],
  )

  return (
    <div
      className="absolute bg-grey-800 rounded overflow-y-auto overflow-x-hidden border border-grey-600 shadow-xl z-30"
      style={{ top: '8px', right: '50%', bottom: '50px', left: '8px' }}
    >
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <span className="text-xxs text-grey-500">
            Assign{' '}
            <kbd className="bg-grey-600 py-1 px-2 text-xxs font-bold uppercase rounded border border-grey-900 text-grey-300">
              space
            </kbd>{' '}
            key
          </span>
        </div>
        <div
          className="font-bold text-sm"
          style={{ columnCount: 2, pageBreakInside: 'avoid' }}
        >
          {browsers.map((browser, i) => {
            const isStriped = Boolean((i + 1) % 2)
            return (
              <label
                key={browser.id}
                className={cc([
                  'inline-block w-full py-2 px-3 space-x-2 rounded',
                  { 'bg-grey-700': isStriped },
                ])}
              >
                <input
                  checked={favBrowserId === browser.id}
                  name="browser-fav"
                  onChange={handleFavChange}
                  onClick={handleFavChange}
                  type="radio"
                  value={browser.id}
                />
                <span>{browser.name}</span>
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TheFavMenu
