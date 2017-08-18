import BottomLink from './common-utils/bottom-link'
import CategoryName from './common-utils/category-name'
import ImgWrapper from './common-utils/img-wrapper'
import MobileFlexSwipeable from './mobile-flex-swipeable'
import MobileList from './common-utils/mobile-list'
import PropTypes from 'prop-types'
import React from 'react'
import Section from './common-utils/section'
import SectionAnimationWrapper from './animations/section-animation-wrapper'
import SectionName from './common-utils/section-name'
import TruncatText from './truncat-text'
import TRLink from './common-utils/twreporter-link'
import get from 'lodash/get'
import sectionStrings from '../constants/section-strings'
import strings from '../constants/strings'
import styled from 'styled-components'
import topicPropType from './prop-types/topic'
import { breakPoints, finalMedia } from '../utils/style-utils'
import { fonts, colors } from '../styles/common-variables'

const _ = {
  get,
}

// If window is less than oneColumnWidth,
// there will be only one column.
const oneColumnWidth = breakPoints.mobileMaxWidth

const Container = styled.div`
  background-color: #f2f2f2;
`
const List = styled.div`
  list-style-type: none;
  padding: 0px;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;

  ${finalMedia.mobile`
    display: none;
  `}
`

const Item = styled.div`
  padding-bottom: 60px;
  width: 544px;
  &:nth-child(odd) {
    margin-right: 32px;
  }
  &:nth-child(even) {
    margin-right: 0px;
  }

  ${finalMedia.desktop`
    width: 369px;
  `}

  ${finalMedia.tablet`
    width: 280px;

    &:nth-child(odd) {
      margin-right: 20px;
    }
  `}

  ${finalMedia.mobile`
    padding-bottom: 40px;
    width: 100%;
    &:nth-child(odd) {
      margin-right: 0px;
    }
  `}
`

const TopicName = CategoryName.extend`
  text-align: center;
`

const Title = styled.div`
  cursor: pointer;
  line-height: 1.25;
  text-align: center;
  color: #4a4a4a;
  font-weight: 600;
  font-size: ${fonts.size.title.large};
  margin-bottom: 15px;
  margin-top: 4px;

  ${finalMedia.mobile`
    font-size: ${fonts.size.title.medium};
  `}
`

const Img = styled.div`
  height: 364px;
  width: 100%;
  margin: 0 auto;
  ${finalMedia.desktop`
    height: 247px;
  `}

  ${finalMedia.tablet`
    height: 186px;
  `}

  ${finalMedia.mobile`
    height: 186px;
  `}
`

const Desc = styled.div`
  margin: 15px auto 0 auto;
  max-width: 504px;
  height: 95px;
  font-size: ${fonts.size.medium};
  p {
    margin: 0;
    text-align: justify;
  }
  color: ${colors.textGrey};

  ${finalMedia.desktop`
    max-width: 323px;
  `}

  ${finalMedia.tablet`
    max-width: 240px;
  `}

  ${finalMedia.mobile`
    max-width: 100%;
    height: 120px;
    font-size: ${fonts.size.large};
  `}
`

const More = styled.div`
  text-align: center;
`

class Topic extends React.PureComponent {
  render() {
    const { title, topicName, desc, imgObj, slug } = this.props
    const href = `topics/${slug}`
    return (
      <Item>
        <TRLink href={href}>
          <TopicName>{`${strings.topic}${strings.fullShapeDot}${topicName}`}</TopicName>
          <Title>
            {title}
          </Title>
          <Img>
            <ImgWrapper
              src={imgObj.src}
              alt={imgObj.alt}
              srcSet={imgObj.srcSet}
            />
          </Img>
          <Desc>
            <TruncatText
              backgroundColor={'#f2f2f2'}
              lines={4}
              lineHeight={1.5}
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          </Desc>
        </TRLink>
      </Item>
    )
  }
}

Topic.defaultProps = {
  title: '',
  topicName: '',
  desc: '',
  imgObj: {},
  slug: '',
}

Topic.propTypes = {
  title: PropTypes.string,
  topicName: PropTypes.string,
  desc: PropTypes.string,
  imgObj: PropTypes.object,
  slug: PropTypes.string,
}

class TopicsSection extends React.PureComponent {
  render() {
    const totalTopics = 4
    const { data, useTinyImg, moreURI } = this.props
    const topicComps = data.map((item) => {
      const desc = _.get(item, 'og_description')
      const imgObj = _.get(item, 'leading_image') || _.get(item, 'og_image')
      return (
        <Topic
          key={_.get(item, 'id')}
          title={_.get(item, 'title')}
          topicName={_.get(item, 'topic_name')}
          desc={desc}
          imgObj={{
            alt: _.get(imgObj, 'description'),
            src: _.get(imgObj, ['resized_targets', useTinyImg ? 'tiny' : 'mobile', 'url']),
          }}
          slug={_.get(item, 'slug')}
        />
      )
    })

    return (
      <Container>
        <Section
          mobileWidth={oneColumnWidth}
        >
          <SectionName
            mobileWidth={oneColumnWidth}
          >
            <span>{sectionStrings.topic}</span>
          </SectionName>
          <List>
            {topicComps}
          </List>
          <MobileList
            maxWidth={oneColumnWidth}
          >
            <MobileFlexSwipeable.SwipableFlexItems
              mobileWidth={oneColumnWidth}
              maxSwipableItems={totalTopics - 1}
            >
              {topicComps}
            </MobileFlexSwipeable.SwipableFlexItems>
          </MobileList>
          <More><BottomLink text="更多報導者專題" path={moreURI} /></More>
        </Section>
      </Container>
    )
  }
}

TopicsSection.defaultProps = {
  data: [],
  moreURI: 'topics',
  useTinyImg: false,
}

TopicsSection.propTypes = {
  data: PropTypes.arrayOf(topicPropType()),
  moreURI: PropTypes.string,
  useTinyImg: PropTypes.bool,
}

export default SectionAnimationWrapper(TopicsSection)
