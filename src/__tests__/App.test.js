import React from 'react';
import App from '../components/app/App';
import {shallow, mount} from 'enzyme';
import Gallery from 'react-photo-gallery';
import faker from 'faker';
import { themes } from '../components/theme-context'

jest.mock('faker');

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

it('renders without crashing', () => {
  shallow(<App />);
});

describe.skip('componentDidMount', () => {
  const photos = ['some photos'];
  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve(mockResponse(200, null, JSON.stringify(photos))));

  it('should fetch photos and put them into app state', () => {
    const wrapper = mount(<App />);

    return Promise.resolve(wrapper)
      .then((component) => {
        return component.update()
      })
      .then(() => {
        expect(wrapper.state().photos).toEqual(photos);
      })
  });
});

it('should pass in photos to Gallery component after loading', () => {
  const photos = [{
    width: 100,
    height: 50,
    src: 'some-src'
  }]
  const wrapper = shallow(<App />);
  wrapper.setState({photos, isLoading: false});
  expect(wrapper.find(Gallery).props().photos).toEqual(photos);
});

it('should map photos and return src, width, height and random country', () => {
  const photos = [{
    id: 'irrelevant',
    width: 100,
    height: 50,
    urls: {
      small: 'some-url'
    }
  }]
  faker.address.country.mockReturnValue('some country');
  const wrapper = shallow(<App />);
  const result = wrapper.instance().mapPhotos(photos);

  expect(result).toEqual([{
    width: 100,
    height: 50,
    src: 'some-url',
    title: 'some country'
  }]);
});

describe('clicking theme link', () => {
  const event = {
    preventDefault: jest.fn()
  };

  it('should call prevent default', () => {
    const wrapper = shallow(<App />);
    wrapper.find("[data-locator='theme-link']").simulate('click', event);

    expect(event.preventDefault).toBeCalled();
  });

  it.only('should toggle theme to light if it is dark', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({theme: themes.dark});
    wrapper.find("[data-locator='theme-link']").simulate('click', event);

    expect(wrapper.state().theme).toEqual(themes.light);
  });

  it.only('should toggle theme to dark if it is light', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({theme: themes.light});
    wrapper.find("[data-locator='theme-link']").simulate('click', event);

    expect(wrapper.state().theme).toEqual(themes.dark);
  });
});