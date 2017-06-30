import AboutAuthorIcon from '../static/about-author.svg'
import AboutDonateIcon from '../static/about-donate.svg'
import AboutSubscribeIcon from '../static/about-subscribe.svg'
import BottomLink from './common-utils/bottom-link'
import ReporterIcon from '../static/reporter-large.svg'
import React from 'react'
import styled from 'styled-components'
import SectionName from './common-utils/section-name'
import sectionStrings from '../constants/section-strings'
import Section from './common-utils/section'
import TRLink from './common-utils/twreporter-link'
import appConfig from '../conf/app-config.json'
import { centerBlock, media } from '../utils/style-utils'
import { colors, fonts } from '../styles/common-variables'

const mobileWidth = '730px'
const desktopWidth = '1300px'

const ContentContainer = Section.extend`
  position: relative;
  color: ${colors.textGrey};
`

const TopContainer = styled.div`
  padding: 0 10px 5px 10px;
  ${centerBlock}
  font-size: ${fonts.size.medium};
  ${media.largeMobile`
    padding-left: 10%;
    padding-right: 10%;
  `}
  max-width: 660px;
  @media (max-width: ${desktopWidth}) {
    max-width: 500px;
  }
`

const ReporterIconWrapper = styled.div`
  ${centerBlock}
  margin-bottom: 30px;
  width: 38px;
`

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 4%;
  margin-top: 15px;
  ${media.largeMobile`
    flex: 1 100%;
    padding: 10px 14.5%;
  `}
`

const Item = styled.div`
  display: flex;
  flex-direction:column;
  text-align: center;
  width: 33%;
  margin: 10px 0;
  padding: 5px 3.6%;
  ${media.largeMobile`
    width: 100%;
    padding: 20px 20px;
  `}
`

const ItemTitle = styled.h3`
  font-size: ${fonts.size.xlarge};
  font-weight: ${fonts.weight.bold};
  ${media.largeMobile`
    margin: 6px;
  `}
`

const ItemIconContainer = styled.div`
  width: 82px;
  height: 82px;
  margin: 40px auto;
  ${media.largeMobile`
    width: 60px;
    height: 60px;
    order: -1;
    margin: 5px auto;
  `}
`

const ItemDescription = styled.div`
  line-height: 1.5;
  font-size: ${fonts.size.medium};
  ${media.largeMobile`
    flex: 1 100%;
    font-size: ${fonts.size.medium};
    line-height: 1.43;
  `}
  ${media.mobile`
    font-size: ${fonts.size.large};
  `}
`

const ItemLink = styled.a`
  margin: 7px;
  padding: 15px 5px;
`

const A = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  &:visited {
    color: ${colors.textGrey};
  }
`

class ReporterIntro extends React.PureComponent {
  render() {
    const authorHref = 'authors'
    const donationHref = 'https://twreporter.backme.tw/cashflow/checkout?project_id=175&reward_id=718'
    return (
      <ContentContainer
        mobileWidth={mobileWidth}
      >
        <SectionName
          mobileWidth={mobileWidth}
        >
          <span>{sectionStrings.donation}</span>
        </SectionName>
        <TopContainer>
          <ReporterIconWrapper>
            <ReporterIcon />
          </ReporterIconWrapper>
          <span itemProp="description">{appConfig.intro}</span>
        </TopContainer>
        <FlexContainer>
          <Item>
            <TRLink href={authorHref}>
              <ItemTitle>作者群</ItemTitle>
            </TRLink>
            <TRLink href={authorHref}>
              <ItemIconContainer><AboutAuthorIcon /></ItemIconContainer>
            </TRLink>
            <ItemDescription>
              果八現程使無生數我考書天然體朋可話的別想著地面指
            </ItemDescription>
            <ItemLink><BottomLink text="告治共經賽為" /></ItemLink>
          </Item>
          <Item>
            <ItemTitle>訂閱</ItemTitle>
            <ItemIconContainer><AboutSubscribeIcon /></ItemIconContainer>
            <ItemDescription>
              COMING SOON 敬請期待
            </ItemDescription>
          </Item>
          <Item>
            <A
              href={donationHref}
              target="_blank"
              rel="noreferrer noopener"
            >
              <ItemTitle>贊助我們</ItemTitle>
            </A>
            <ItemIconContainer>
              <a
                href={donationHref}
                target="_blank"
                rel="noreferrer noopener"
              >
                <AboutDonateIcon />
              </a>
            </ItemIconContainer>
            <ItemDescription>
              果八現程使無生數我考書天然體朋可話的別想著地面指
            </ItemDescription>
            <ItemLink><BottomLink text="無生數我考書" /></ItemLink>
          </Item>
        </FlexContainer>
      </ContentContainer>
    )
  }
}

export default ReporterIntro
