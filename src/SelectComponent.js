/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import Table from './Table';

const optionList = ['title', 'price', 'popularity', 'subcategory'];

const SelectComponent = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [files, setFiles] = useState([]);
  const [isTitlePresent, setIsTitlePresent] = useState(false);
  const [isPricePresent, setIsPricePresent] = useState(false);
  const [isPopularityPresent, setIsPopularityPresent] = useState(false);
  const [isSubcategoryPresent, setIsSubcategoryPresent] = useState(false);
  const pushValue = useRef();
  const removeValue = useRef();

  function checkOptions() {
    if (selectedOptions.includes('title')) {
      setIsTitlePresent(true);
    }
    if (selectedOptions.includes('price')) {
      setIsPricePresent(true);
    }
    if (selectedOptions.includes('popularity')) {
      setIsPopularityPresent(true);
    }
    if (selectedOptions.includes('subcategory')) {
      setIsSubcategoryPresent(true);
    }
  }

  function pushItems(arr, value) {
    const isPresent = arr.includes(value);
    if (isPresent) {
      return;
    } else {
      let options = [...selectedOptions];
      options.push(value);
      setSelectedOptions(options);
    }
  }

  function removeOption(arr, value) {
    arr = arr.filter(item => item !== value);
    setSelectedOptions(arr);
    if (value === 'title') {
      setIsTitlePresent(false);
    }
    if (value === 'price') {
      setIsPricePresent(false);
    }
    if (value === 'popularity') {
      setIsPopularityPresent(false);
    }
    if (value === 'subcategory') {
      setIsSubcategoryPresent(false);
    }
  }

  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = e => {
      let product = [];
      let prod = JSON.parse(e.target.result);
      product = Object.entries(prod.products).map(e => e[1]);
      product.sort(function (a, b) {
        var x = Number(a['popularity']);
        var y = Number(b['popularity']);
        return x < y ? 1 : x > y ? -1 : 0;
      });
      setFiles(product);
    };
  };

  useEffect(() => {
    checkOptions();
  }, [selectedOptions]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
          marginTop: '50px',
        }}
      >
        <h1>Upload Json file</h1>
        <input type="file" onChange={handleChange} />
        <select
          ref={pushValue}
          style={{ width: '200px', height: '200px' }}
          multiple
        >
          {optionList.map(e => {
            return <option value={e}>{e}</option>;
          })}
        </select>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <button
            onClick={() => pushItems(selectedOptions, pushValue.current.value)}
          >
            <img src="right.png" height={20} width={20} alt="right" />
          </button>
          <button
            onClick={() =>
              removeOption(selectedOptions, removeValue.current.value)
            }
          >
            <img src="left.png" height={20} width={20} alt="left" />
          </button>
        </div>
        <select
          ref={removeValue}
          style={{ width: '200px', height: '200px' }}
          multiple
        >
          {selectedOptions &&
            selectedOptions.map(e => {
              return <option value={e}>{e}</option>;
            })}
        </select>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        {files && selectedOptions && (
          <Table
            data={files}
            isTitlePresent={isTitlePresent}
            isPopularityPresent={isPopularityPresent}
            isSubcategoryPresent={isSubcategoryPresent}
            isPricePresent={isPricePresent}
          />
        )}
      </div>
    </>
  );
};

export default SelectComponent;
