import React from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';
import axios from 'axios';


function App() {
  const [searchValue, setSearchValue] = React.useState('');
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [sumValue, setSumValue] = React.useState();
  const [sumTax, setSumTax] = React.useState();
  React.useEffect(() => {
   
      axios.get('https://61d2da55b4c10c001712b615.mockapi.io/cart')
      .then(res => {
        
        axios.get('https://61d2da55b4c10c001712b615.mockapi.io/items')
        .then(res => {
          
          setItems(res.data);
        })
        setCartItems(res.data);
      })
  }, []);
  const onAddToCart = (obj) => {
    
    axios.post('https://61d2da55b4c10c001712b615.mockapi.io/cart',obj)
    setCartItems(prev => [...prev, obj]);
  }
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }
  const omRemoveItem =(id) =>{
    console.log(id);
    axios.delete(`https://61d2da55b4c10c001712b615.mockapi.io/cart/${id}`)
    setCartItems(prev => prev.filter(item => item.id !== id));
    
  }

  React.useEffect(() => {
    var initialValue = 0;
    const sum = cartItems.reduce(
      function (accumulator, currentValue) {
        return accumulator + currentValue.price;
      }, initialValue
    )
    setSumValue(sum);
    setSumTax(Math.round(sum * 0.05));
  }, [cartItems]);
  return (
    <div className="wrapper clear">

      {cartOpened && <Drawer items={cartItems} sumValue={sumValue} sumTax={sumTax} onClose={() => setCartOpened(false)} onRemove={omRemoveItem} />}
      <Header
        onClickCart={() => setCartOpened(true)}
        SumValue={sumValue}
      />

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1 >{searchValue ? `Поиск по запросу:"${searchValue}"` : "Все кроссовки"}</h1>
          <div className="search-block d-flex">
            <img src="img/search.svg" alt="Search" />
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск ..." />

          </div>
        </div>
        <div className="d-flex flex-wrap">

          {
            items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item) => (
              <Card
                key={item.id}
                cartid={item.id}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={() => console.log('Добавили в закладки')}
                onPlus={(obj) => onAddToCart(obj)}
                onRemove={(obj) => omRemoveItem(obj.id)}
                CheckItem={cartItems.some(obj => obj.cartid == item.id )}
              />

            ))}



        </div>
      </div>
    </div>

  );
}

export default App;
