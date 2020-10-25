import React, { useEffect, useState, useContext } from 'react';
import { Button, Menu } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { findByName, findById } from '../../api/searchCity';
import { AuthContext } from '../../context/AuthContext';
import { addToList, removeFromList } from '../../api/changeCityList';
import SearchCity from '../SearchCity';
import Weather from '../Weather';
import './Cities.scss';


const Cities = () => {
   const [currentTab, setCurrentTab] = useState('');
   const [cities, setCities] = useState([]);
   const [searchOptions, setSearchOptions] = useState([]);
   const [displayMenu, setDisplayMenu] = useState(false);
   const { token, userCityId, isAuthenticated } = useContext(AuthContext);

   useEffect(() => {
      setCities([]);
      isAuthenticated && userCityId.forEach(async (id) => {
         const weather = await findById(parseInt(id));
         setCities(prev => [...prev, weather]);
      });
   }, [isAuthenticated, userCityId]);

   const handleSearch = async (cityName, searchType) => {

      if (searchType === 'byId') {
         const idx = cities.findIndex(item => (item.name.concat(', ', item.country) === cityName));
         if (idx !== -1) {
            setCurrentTab(cities[idx].name);
            return;
         }

         const index = searchOptions.findIndex(item => (item.name.concat(', ', item.country) === cityName));

         const weather = index !== -1 ?
            await findById(searchOptions[index].id) :
            console.log('Error while finding requested city.');
         if (weather) {
            let data;
            if (isAuthenticated)
               data = await addToList(weather.id, token);
            if (!isAuthenticated || (data && data.ok)) {
               setCities([...cities, weather]);
               setCurrentTab(weather.name);
            }
         }
      }

      if (searchType === 'byName') {
         const res = await findByName(cityName);
         setSearchOptions(res);
      }
   }

   const handleDelete = async cityName => {
      const index = cities.findIndex(item => item.name === cityName);
      const id = cities[index].id;
      let data;
      if (isAuthenticated) {
         data = await removeFromList(id, token);
      }
      if (!isAuthenticated || (data && data.ok)) {
         setCities(
            cities.filter(city => city.id !== id)
         );
      }
   }

   return (
      <div>
         <SearchCity
            search={handleSearch}
            cities={searchOptions.length ? searchOptions : []}
            setDisplayMenu={setDisplayMenu}
         >
         </SearchCity>
         <div className="Cities">
            <Menu
               style={{ border: 'none' }}
               className="CityList"
               onClick={e => setCurrentTab(e.key)}
               selectedKeys={[currentTab]}
               mode="vertical"
            >
               {
                  displayMenu && cities.map(city => (
                     <Menu.Item
                        className="MenuItem"
                        key={city.name}
                        icon={<EnvironmentOutlined />}
                     >
                        <span className="CityName">
                           {city.name}
                        </span>
                        <span className="closeButtonContainer">
                           <Button
                              className="closeButton"
                              type="primary"
                              shape="circle"
                              size="small"
                              onClick={(e) => {
                                 e.stopPropagation();
                                 handleDelete(city.name)
                              }}
                           >
                              {'\u00D7'}
                           </Button>
                        </span>
                     </Menu.Item>
                  ))
               }
            </Menu>

            <div className="Weather">
               <Weather
                  className="Weather1"
                  weather={cities.find(city => (city.name === currentTab))}
               />
            </div>
         </div>
      </div>
   );
};

export default Cities;
