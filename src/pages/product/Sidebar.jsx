import React, { useState, useEffect } from "react";
import axios from "axios";
const CATEGORY_API = "/api/categories";
export const Sidebar = (props) => {
  const { filter, dispatch } = props;

  const [categoryList, setCategoryList] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios(CATEGORY_API);
      setCategoryList(res.data.categories);
      setLoading(true);
    };
    fetchData();
  }, [loading]);
  return (
    <aside>
      <div className="wrapper_filter">
        <div className="wrapper_filter_head flex ">
          <h3 className="filter_head_text text_cl kodchasan">filters</h3>

          <button className="btn-link text_uc kodchasan">clear</button>
        </div>{" "}
        <p>
          {" "}
          <input
            name="filter"
            type="checkbox"
            id="includeOutOfStock"
            className="filter_input"
            onClick={() =>
              dispatch({ type: "OUT-OF-STOCK", payload: !filter.outOfStock })
            }
          />
          <label htmlFor="includeOutOfStock">Include Out of Stock</label>{" "}
        </p>
        <h3 className="filter_head_text text_cl kodchasan">offer</h3>
        <p>
          <input
            id="offer-dealOfTheDay"
            className="filter_input text_cl"
            type="checkbox"
            onClick={() =>
              dispatch({
                type: "OFFER-DEAL-OF-DAY",
                payload: !filter.offerDealOfDay,
              })
            }
          />
          <label htmlFor="offer-dealOfTheDay">Deal of the day</label>
        </p>
        <p>
          <input
            id="offer-bonanza"
            className="filter_input text_cl"
            type="checkbox"
            onClick={() =>
              dispatch({
                type: "OFFER-BONANZA",
                payload: !filter.offerBonanza,
              })
            }
          />
          <label htmlFor="offer-bonanza">70% Bonanza</label>
        </p>
        <h3 className="filter_head_text text_cl kodchasan">price</h3>
        <label htmlFor="price-range"></label>
        <input
          type="range"
          id="price-range"
          min="200"
          max="1000"
          step="200"
          value={filter.priceRange}
          className="slider-pixel slider"
          onChange={(e) =>
            dispatch({ type: "PRICE-RANGE", value: e.target.value })
          }
        />
        <p className="p-sm">{filter.priceRange}</p>
        <h3 className="filter_head_text text_cl kodchasan">category</h3>
        {categoryList &&
          categoryList.map(({ _id, categoryName }) => (
            <p key={_id}>
              <input
                id={_id}
                className="filter_input "
                type="checkbox"
                value={categoryName}
                onClick={(e) =>
                  dispatch({
                    type: "CATEGORY",
                    payload: filter.category.find(
                      (item) => item === categoryName
                    )
                      ? filter.category.filter((item) => item !== categoryName)
                      : [...filter.category, categoryName],
                  })
                }
              />
              <label className="text_cl" htmlFor={_id}>
                {categoryName}
              </label>
            </p>
          ))}
        <h3 className="filter_head_text text_cl kodchasan">rating</h3>
        <p>
          <input
            name="rating"
            id="filter_4_star"
            className="filter_input"
            type="radio"
            onClick={() => dispatch({ type: "RATING", payload: 4 })}
          />
          <label htmlFor="filter_4_star">4 Stars & above</label>
        </p>
        <p>
          <input
            name="rating"
            id="filter_3_star"
            className="filter_input"
            type="radio"
            onClick={() => dispatch({ type: "RATING", payload: 3 })}
          />
          <label htmlFor="filter_3_star">3 Stars & above</label>
        </p>
        <p>
          <input
            name="rating"
            id="filter_2_star"
            className="filter_input"
            type="radio"
            onClick={() => dispatch({ type: "RATING", payload: 2 })}
          />
          <label htmlFor="filter_2_star">2 Stars & above</label>
        </p>
        <p>
          <input
            name="rating"
            id="filter_1_star"
            className="filter_input"
            type="radio"
            onClick={() => dispatch({ type: "RATING", payload: 1 })}
          />
          <label htmlFor="filter_1_star">1 Stars & above</label>
        </p>
        <h3 className="filter_head_text text_cl kodchasan">sort by</h3>
        <p>
          <input
            className="filter_input"
            name="price-sort"
            type="radio"
            id="price-lh"
            onChange={() => dispatch({ type: "LOW-HIGH" })}
          />
          <label htmlFor="price-lh"> Price - Low to High</label>
        </p>
        <p>
          <input
            className="filter_input"
            name="price-sort"
            type="radio"
            id="price-hl"
            onChange={() => dispatch({ type: "HIGH-LOW" })}
          />
          <label htmlFor="price-hl">Price - High to Low</label>
        </p>
      </div>
    </aside>
  );
};
