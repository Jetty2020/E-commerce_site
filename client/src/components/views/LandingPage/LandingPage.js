import React, { useEffect, useState } from 'react';
import SearchFeature from './Sections/SearchFeature';
import VisualSlider from './Sections/VisualSlider';
import RecoList from './Sections/RecoList';
import EventList from './Sections/EventList';
import NnHList from './Sections/NnHList';
import SaleList from './Sections/SaleList';
import KeyList from './Sections/KeyList';
// import CreateProducts from '../../utils/CreateProducts';
import './LandingPage.css';

function LandingPage() {
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [SearchTerms, setSearchTerms] = useState('');


  const [Filters, setFilters] = useState({
    continents: [],
    price: [],
  });

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(variables);
  }, []);

  const getProducts = (variables) => {
  };

  const updateSearchTerms = (newSearchTerm) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };
    setSkip(0);
    setSearchTerms(newSearchTerm);
    getProducts(variables);
  };
  return (
    <div>
      <VisualSlider />
      <div style={{ width: '75%', margin: '3rem auto' }}>
        <SearchFeature refreshFunction={updateSearchTerms} />
        <RecoList />
        <EventList />
        <NnHList/>
        <SaleList/>        
        <KeyList/>        
      </div>
    </div>
  );
}

export default LandingPage;