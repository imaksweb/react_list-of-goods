import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  NONE,
  ALPABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

// Use this function in the render to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  // Sort and reverse goods if needed
  switch (sortType) {
    case SortType.ALPABET:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SortType.LENGTH:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;

    case SortType.NONE:
      break;

    default:
      throw new Error('Wrong type!');
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

type State = {
  isReversed: boolean,
  sortType: SortType,
};

export class App extends React.Component<{}, State> {
  state: Readonly<State> = {
    isReversed: false,
    sortType: SortType.NONE,
  };

  sortByName = () => {
    this.setState({
      sortType: SortType.ALPABET,
    });
  };

  render() {
    const visibleGoods = getReorderedGoods(goodsFromServer, this.state);
    const { sortType, isReversed } = this.state;

    return (
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={cn(
              'button',
              'is-info',
              {
                'is-light': sortType !== SortType.ALPABET,
              },
            )}
            onClick={this.sortByName}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className="button is-success is-light"
          >
            Sort by length
          </button>

          <button
            type="button"
            className="button is-warning is-light"
          >
            Reverse
          </button>

          <button
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        </div>

        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={uuidv4()}>
              {good}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
