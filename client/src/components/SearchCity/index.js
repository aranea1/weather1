import React, { useEffect, useState } from 'react';
import { List, Input } from 'antd';

const searchOptions = {
   zIndex: 2,
   width: '15rem',
   position: 'absolute',
   backgroundColor: "white"
};

const SearchCity = props => {

   const { search, cities } = props;
   const [searchInput, setSearchInput] = useState('');
   const [displayOptions, setDisplayOptions] = useState(false);
   const cityNames = cities.map(item => (item.name.concat(', ', item.country)));

   const handleClick = () => {
      setDisplayOptions(false);
   }
   useEffect(() => {
      document.addEventListener('click', handleClick);
      return () => {
         document.removeEventListener('click', handleClick);
      }
   }, [searchInput]);

   useEffect(() => {
      props.setDisplayMenu(!displayOptions);
      // eslint-disable-next-line
   }, [displayOptions]);


   const handleInputChange = e => {
      const value = e.target.value;
      setSearchInput(value);
      if (!value) {
         return setDisplayOptions(false);
      }
      search(value, 'byName');
      setDisplayOptions(true);
   }

   return (
      <div>
         <Input
            style={{ width: '15rem' }}
            className="searchCityInput"
            value={searchInput}
            placeholder="Enter the name of the city"
            onChange={e => { handleInputChange(e) }}
         />
         {
            (displayOptions &&
               (cityNames.length &&
                  <List
                     style={searchOptions}
                     size="small"
                     bordered
                     dataSource={cityNames}
                     renderItem={item =>
                        <List.Item
                           style={{ cursor: 'pointer' }}
                           onClick={(e) => {
                              setSearchInput(item);
                              setDisplayOptions(false);
                              setSearchInput('');
                              search(e.target.innerHTML, 'byId');
                           }}
                        >
                           {item}
                        </List.Item>
                     }
                  />
               )
            ) ||
            (displayOptions &&
               <List
                  style={searchOptions}
                  size="small"
                  bordered
               >
                  <List.Item>
                     No matches found
                  </List.Item>
               </List>
            )
         }
      </div>
   );
}
export default SearchCity;
