import styled from "styled-components";
import { errorDefaultSrc } from "../Helpers.js";

const InfluencerCard = ({ influencer }) => {
  const getImage = (platform) => require(`../images/${platform}.png`);

  return (
    <Card>
      <ProfileContainer>
      <InfluencerLink influencer={influencer}>
        <ProfilePic
          src={influencer?.profile_pic_url}
          alt="Profile Pic"
          onError={errorDefaultSrc}
        />
      </InfluencerLink >
        <Followers>{influencer?.followers}</Followers>
      </ProfileContainer>
      <ContentContainer>
        <FieldTitle>Handle</FieldTitle>
        <CardFields>{influencer?.handle}</CardFields>
        <FieldTitle>Tags</FieldTitle>
        <TagContainer>
          {influencer?.tags.map((tag) => (
            <Tag key={"inf_tag_key" + influencer.id + tag.id}>{tag.name}</Tag>
          ))}
        </TagContainer>
        <FieldTitle>Followers</FieldTitle>
        <CardFields>{influencer?.followers}</CardFields>
      </ContentContainer>
      <PlatformImage src={getImage(influencer?.platform?.name)?.default} />
    </Card>
  );
};

const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin: 18px;
  width: 200px;
  display: inline-block;
  position: relative;
  height: 350px;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  padding: 0px 20px 0px 20px;
  text-align: left;
  padding: 8px;
`;

const ProfileContainer = styled.div`
  position: relative;
`;

const ProfilePic = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 5px 5px 0 0;
  object-fit: cover;
  background-color: #fff8f2;
`;

const PlatformImage = styled.img`
  width: 45px;
  height: 45px;
  position: absolute;
  left: 148px;
  top: 10px;
  border-radius: 23px;
`;

const CardFields = styled.span`
  color: grey;
`;

const FieldTitle = styled.div`
  font-size: 12px;
  margin-top: 5px;
`;

const Followers = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  border: none;
  border-radius: 50px;
  background-color: #55de55;
  padding: 1px 10px;
  font-size: 10px;
`;

const Tag = styled.div`
  font-size: 10px;
  border-radius: 50px;
  background-color: #ff8d4b;
  display: inline-block;
  padding: 1px 10px;
  margin-left: 4px;
`;

const TagContainer = styled.div``;

const InfluencerLink = (props) => {
  const platformLink = 'https://' + props.influencer.platform.name + '.com/' + props.influencer.handle
  return <a href={platformLink}>{props.children}</a>
}

export default InfluencerCard;
