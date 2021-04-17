import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
// import { HashRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { ImageFilters } from '../ImageFilters';

let onClick = jest.fn();

describe('testing file upload', () => {
  afterEach(cleanup);

  test('should input file  clicked successfully', () => {
    const { getByTestId } = render(<ImageFilters data-testid='input-file' onClick={()=> onClick()}/>);
    const linkElement = getByTestId('input-file');
    fireEvent.click(linkElement);
  });




  //   snapshot

  test('should do snapshot', () => {
    const ImageFiltersComp = renderer.create(
      <ImageFilters
      />
    ).toJSON();
    expect(ImageFiltersComp).toMatchSnapshot();
  });


});