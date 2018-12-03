import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Listitem from "../Listitem/Listitem";

const projectList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.projects}
      keyExtractor={(item, index) => index.toString()}
      renderItem={info => (
        <Listitem
          projectKey={info.item.key}
          projectName={info.item.name}
          projectImage={info.item.image}
          location={info.item.location}
          starCount={info.item.starCount}
          onItemPressed={props.onItemSelected}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default projectList;
