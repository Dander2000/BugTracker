import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { SET_PAGE } from '../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.home
});

const mapDispatchToProps = dispatch => ({
  onSetPage: (page, payload) =>
    dispatch({ type: SET_PAGE, page, payload })
});

const ListPagination = props => {
  if (props.itemsCounter <= 5) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(props.itemsCounter / 5); ++i) {
    range.push(i);
  }

  const setPage = page => {
    if (props.pager) {
      //agent.Bugs.search(props.searchBug, props.tag, page)
      props.onSetPage(page, props.pager(props.searchBug, props.tag, page));
    } else {
      props.onSetPage(page, agent.Bugs.all(page))
    }
  };

  return (
    <nav>
      <ul className="pagination">
        {
          range.map(v => {
            const isCurrent = v === props.currentPage;
            const onClick = ev => {
              ev.preventDefault();
              setPage(v);
            };
            return (
              <li
                className={isCurrent ? 'page-item active' : 'page-item'}
                onClick={onClick}
                key={v.toString()}>

                <a className="page-link" href="">{v + 1}</a>

              </li>
            );
          })
        }
      </ul>
    </nav>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPagination);
