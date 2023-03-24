import { useState } from 'react';
import Wrapper from './Wrapper';
import TitleWrapper from './TitleWrapper';
import Title from './Title';
import ToggleButton from './ToggleButton';
import ToggleView from './ToggleView';
import Carousel from '../Carousel';
import Grid from './Grid';

export default function SlideshowGridGallery({ title, children }) {
  const [showFirstChild, setShowFirstChild] = useState(true);
  if (!children.length) return null;
  return (
    <Wrapper>
      <TitleWrapper>
        <Title content={title} />
        {children?.length > 3 && (
          <ToggleButton handleClick={setShowFirstChild}>
            <ToggleView showFirst={showFirstChild}>
              <>Show Grid</>
              <>Show Slideshow</>
            </ToggleView>
          </ToggleButton>
        )}
      </TitleWrapper>
      <ToggleView showFirst={showFirstChild}>
        <Carousel>{children}</Carousel>
        <Grid>{children}</Grid>
      </ToggleView>
    </Wrapper>
  );
}
