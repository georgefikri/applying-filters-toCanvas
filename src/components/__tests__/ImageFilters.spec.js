import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
// import { HashRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { ImageFilters } from '../ImageFilters';

let onClick = jest.fn();

describe('testing file upload', () => {
  afterEach(cleanup);

//   test('should button clicked successfully', () => {
//     const { getByTestId } = render(<Button data-testid='button' onClick={()=> onClick()}/>);
//     const linkElement = getByTestId('button');
//     fireEvent.click(linkElement);
//   });




  //   snapshot

  test('should do snapshot', () => {
    const ImageFiltersComp = renderer.create(
      <ImageFilters
      />
    ).toJSON();
    expect(ImageFiltersComp).toMatchSnapshot();
  });


});