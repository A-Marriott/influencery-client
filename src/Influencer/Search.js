import { useState, useEffect } from "react";
import InfluencerCard from "./Card";
import styled from "styled-components";

const InfluencerSearch = () => {
  const [influencers, setInfluencers] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [platformString, setPlatformString] = useState("all");
  const [followerOrder, setFollowerOrder] = useState("followers");
  // const [searchFilter, setSearchFilter] = useState([]);
  // const [platformFilter, setPlatformFilter] = useState([]);


  useEffect(() => {
    getInfluencers();
  }, []);

  const getInfluencers = () =>
    fetch("http://localhost:3000/api/v1/influencers", {
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setInfluencers(data))
      // setSearchFilter(data)
      // setPlatformFilter(data)


// Need to be able to type additional letter, forget letter, incorrect letter, allow flexibility

  // const searchFilter = (influencers) => {
  //   return influencers?.filter((influencer) => {
  //     return searchString.split(/\s/).every((string) => {
  //       const stringArray = string.split('').map(char => '.?' + char)
  //       stringArray.push('.?')
  //       const stringRegex = new RegExp(stringArray.join(''))
  //       return influencer.handle.match(stringRegex) ||
  //       influencer.platform.name.match(stringRegex) ||
  //       influencer.tags.some(tag => tag.name.match(stringRegex))
  //     })
  //   });
  // }

    const searchFilter = (influencers) => {
    return influencers?.filter((influencer) => {
      return searchString.split(/\s/).every((string) => {
        return influencer.handle.includes(string) ||
        influencer.platform.name.includes(string) ||
        influencer.tags.some(tag => tag.name.includes(string))
      })
    });
  }

  // const updateSearch = ((e) => {
  //   setSearchString(e.target.value.toLowerCase())
  //   setSearchFilter((influencers) => {
  //   console.log(influencers)
  //     return influencers?.filter((influencer) => {
  //       return searchString.split(/\s/).every((string) => {
  //         return influencer.handle.includes(string) ||
  //         influencer.platform.name.includes(string) ||
  //         influencer.tags.some(tag => tag.name.includes(string))
  //       })
  //     });
  //   });
  //   console.log(influencers)
  // });

  const platformFilter = (influencers) => {
    return influencers?.filter((influencer) => {
      return influencer.platform.name === platformString || platformString === "all"
    });
  }

  // const updatePlatform = ((e) => {
  //   setPlatformString(e.target.value)
  //   setPlatformFilter((influencers) => {
  //     return influencers?.filter((influencer) => {
  //       return influencer.platform.name === platformString || platformString === "all"
  //     });
  //   })
  // })

  const followerFilter = (influencers) => {
    if (followerOrder === "high to low") {
      return influencers?.sort((a, b) => b.followers - a.followers);
    } else if (followerOrder === "low to high") {
      return influencers?.sort((a, b) => a.followers - b.followers);
    }
    return influencers
  }

  const filteredInfluencers = followerFilter(platformFilter(searchFilter(influencers)))

  // const filteredInfluencers = searchFilter.filter((influencer) => {
  //   return platformFilter.includes(influencer)
  // })

  return (
    <div>
      <SearchInputContainer>
        <SearchInput
          placeholder="Enter influencer handle, platform, or tag"
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value.toLowerCase())}
        />
        <SelectInput
          value={platformString}
          onChange={(e) => setPlatformString(e.target.value)}
          name="platforms"
          id="platforms"
        >
          <option value="all">All</option>
          <option value="instagram">Instagram</option>
          <option value="twitter">Twitter</option>
          <option value="facebook">Facebook</option>
          <option value="tiktok">Tik-Tok</option>
          <option value="youtube">Youtube</option>
        </SelectInput>
        <SelectInput
          value={followerOrder}
          onChange={(e) => setFollowerOrder(e.target.value)}
          name="followers"
          id="followers"
        >
          <option value="followers">Followers</option>
          <option value="high to low">High to low</option>
          <option value="low to high">Low to high</option>
        </SelectInput>
      </SearchInputContainer>
      <SearchContainer>
        {!influencers && <Loader />}
        <div>
          {filteredInfluencers?.map((inf, i) => (
            <InfluencerCard influencer={inf} key={"inf_card_" + i} />
          ))}
        </div>
      </SearchContainer>
    </div>
  );
};

const SelectInput = styled.select`
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  border: 2px solid #2d9fd9;
  color: grey;
  width: 100px;
  height: 35px;
  padding-left: 10px;
  &:focus {
    outline: none;
    border: 2px solid #ee7622;
    color: grey;
  }
  margin: 10px;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 70px 20vw 30px 20vw;
`;

const Loader = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: loader-spin 2s linear infinite;
  position: absolute;
  top: 45vh;
`;

const SearchInput = styled.input`
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  border: 2px solid #2d9fd9;
  color: grey;
  width: 300px;
  height: 30px;
  padding-left: 20px;
  &:focus {
    outline: none;
    border: 2px solid #ee7622;
    color: grey;
  }
  margin: 10px;
`;

const SearchInputContainer = styled.div`
  width: 100%;
  position: fixed;
  background-color: #f2f2f2;
  z-index: 1000;
`;

export default InfluencerSearch;
