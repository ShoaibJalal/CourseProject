import React, { Component } from "react";
import { FlatList, StyleSheet } from "react-native";
import Listitem from "../Listitem/Listitem";

const projectList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.projects}
      renderItem={info => (
        <Listitem
          projectName={info.item.name}
          projectImage={info.item.image}
          onItemPressed={() => props.onItemSelected(info.item.key)}
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
