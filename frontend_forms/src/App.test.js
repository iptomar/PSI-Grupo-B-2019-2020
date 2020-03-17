import React from 'react';
import {shallow} from 'enzyme/build';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

it('mounts without crashing', () => {
  const wrapper = shallow(<App />);
  wrapper.unmount()
});
