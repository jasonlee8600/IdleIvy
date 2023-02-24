import Yale from '../pages/yale';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(<Yale />).toJSON();
    expect(tree).toMatchSnapshot();
  });