import React from 'react';
import './TableStyles.css';

const Table = ({
  data,
  isTitlePresent,
  isPricePresent,
  isPopularityPresent,
  isSubcategoryPresent,
}) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            {isTitlePresent && <th>Title</th>}
            {isPricePresent && <th>Price</th>}
            {isPopularityPresent && <th>Popularity</th>}
            {isSubcategoryPresent && <th>Sub-Category</th>}
          </tr>
          {data &&
            data.map((prod, key) => {
              return (
                <tr key={key}>
                  {isTitlePresent && <td>{prod.title}</td>}
                  {isPricePresent && <td>{prod.price}</td>}
                  {isPopularityPresent && <td>{prod.popularity}</td>}
                  {isSubcategoryPresent && <td>{prod.subcategory}</td>}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
