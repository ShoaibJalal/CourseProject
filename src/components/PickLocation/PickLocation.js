import React, { Component } from "react";
import { View, Button, StyleSheet, Dimensions } from "react-native";
import { MapView } from "expo";

class PickLocation extends Component {
  state = {
    focusedLocation: {
      latitude: 60.200692,
      longitude: 24.934302,
      latitudeDelta: 0.0322,
      longitudeDelta:
        (Dimensions.get("window").width / Dimensions.get("window").height) *
        0.0322
    },
    locationChosen: false
  };
  pickLocationHandler = e => {
    let coords = e.nativeEvent.coordinate;

    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      };
    });
  };
  render() {
    let marker = null;
    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
    }
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.focusedLocation}
          region={this.state.focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
        >
          {marker}
        </MapView>
        <View style={styles.button}>
          <Button
            title="Use current location"
            onPress={() => alert("Pick Location!")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  map: {
    width: "100%",
    height: 250
  },
  button: {
    margin: 8
  }
});

export default PickLocation;
