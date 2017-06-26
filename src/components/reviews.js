import React from 'react'
import BottomLink from './common-utils/bottom-link'
import CategoryName from './common-utils/category-name'
import get from 'lodash/get'
import ImgWrapper from './common-utils/img-wrapper'
import MobileFlexSwipeable from './mobile-flex-swipeable'
import MobileListUtils from './common-utils/mobile-list'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SectionName from './common-utils/section-name'
import sectionStrings from '../constants/section-strings'
import Section from './common-utils/section'
import { fonts, colors } from '../styles/common-variables'
import { getImageSrcSet } from '../utils/image-processor'
import { truncate } from '../utils/style-utils'

const _ = {
  get,
}

// 4 columns: tabletMaxWidth, tabletMidWidth
// 3 columns: tabletMinWidth
const tabletMaxWidth = '1023px'
const tabletMidWidth = '890px'
const tabletMinWidth = '758px'
const mobileWidth = '730px'
const maxSwipableItems = 3
const moreText = '更多觀點文章'

const Container = Section.extend`
  background-color: white;
  width: 100%;
`

const FlexBox = styled.div`
  display: flex;
  padding: 0 47px;
  justify-content: space-between;
  @media(max-width: ${tabletMaxWidth}) {
    padding: 0 35px;
  }
  @media(max-width: ${mobileWidth}) {
    display: none;
  }
`

const FlexItem = styled.div`
  width: 210px;
  &:nth-child(3) {
    margin-left: 30px;
  }
  &:nth-child(even) {
    margin-left: 30px;
  }
  &:nth-child(4) {
    @media(max-width: ${tabletMinWidth}) {
      display: none;
    }
    @media(max-width: ${mobileWidth}) {
      display: inline;
    }
  }
  @media(max-width: ${tabletMaxWidth}) {
    width: 189px;
    &:nth-child(3) {
      margin-left: 10px;
    }
    &:nth-child(even) {
      margin-left: 10px;
    }
  }
  @media(max-width: ${tabletMidWidth}) {
    width: 159px;
  }
  @media(max-width: ${tabletMinWidth}) {
    width: 189px;
  }
  @media(max-width: ${mobileWidth}) {
    width: 100%;
  }
`

const ImgFrame = styled.div`
  width: 100%;
  height: 136px;
  @media(max-width: ${tabletMaxWidth}) {
    height: 110px;
  }
  @media(max-width: ${tabletMidWidth}) {
    height: 102px;
  }
  @media(max-width: ${tabletMinWidth}) {
    height: 110px;
  }
  @media(max-width: ${mobileWidth}) {
    height: 198px;
  }
`

const TextFrame = styled.div`
  margin: 13px auto 0 auto;
  width: 92%;
`

const Category = CategoryName.extend`
  line-height: 1.33;
  @media(max-width: ${mobileWidth}) {
    margin-top: 9px;
  }
`

const Title = styled.div`
  margin-top: 4px;
  font-size: ${fonts.size.medium};
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.5;
  color: ${colors.textGrey};
`

const Description = styled.div`
  margin-top: 8px;
  font-size: ${fonts.size.base};
  color: ${colors.textGrey};
  ${truncate('relative', 1.43, 3, 'white', 'left')}
`

const More = styled.div`
  width: 98px;
  margin: 60px auto 0 auto;
`

class Reviews extends React.Component {
  render() {
    const { data } = this.props
    const ReviewsItem = data.map((post) => {
      return (
        <FlexItem
          key={_.get(post, 'id')}
        >
          <ImgFrame>
            <ImgWrapper
              alt={_.get(post, 'hero_image.description')}
              src={_.get(post, 'hero_image.resized_targets.mobile.url')}
              srcSet={getImageSrcSet(_.get(post, 'hero_image'))}
            />
          </ImgFrame>
          <TextFrame>
            <Category>
              {_.get(post, 'subtitle', '')}
            </Category>
            <Title>
              {_.get(post, 'title', '')}
            </Title>
            <Description>
              {_.get(post, 'og_description', '')}
            </Description>
          </TextFrame>
        </FlexItem>
      )
    })

    return (
      <Container
        mobileWidth={mobileWidth}
      >
        <SectionName
          mobileWidth={mobileWidth}
        >
          <span>{sectionStrings.review}</span>
        </SectionName>
        <FlexBox>
          {ReviewsItem}
        </FlexBox>
        <MobileListUtils
          maxWidth={mobileWidth}
        >
          <MobileFlexSwipeable.SwipableFlexItems
            mobileWidth={mobileWidth}
            maxSwipableItems={maxSwipableItems}
          >
            {ReviewsItem}
          </MobileFlexSwipeable.SwipableFlexItems>
        </MobileListUtils>
        <More><BottomLink text={moreText} isDarkBg /></More>
      </Container>
    )
  }
}

Reviews.defaultProps = {
  data: [],
}

Reviews.propTypes = {
  data: PropTypes.array,
}

export default Reviews
