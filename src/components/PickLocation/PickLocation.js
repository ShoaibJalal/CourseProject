import React, { Component } from "react";
import { View, Button, StyleSheet, Dimensions } from "react-native";
import { MapView, Location, Permissions } from "expo";

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
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
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
    this.props.onLocationPick({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  };

  getLocationHandler = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      alert("No permission to access location");
    } else {
      let location = await Location.getCurrentPositionAsync({});

      this.setState(prevState => {
        return {
          focusedLocation: {
            ...prevState.focusedLocation,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          },
          locationChosen: true
        };
      });
      this.map.animateToRegion({
        ...this.state.focusedLocation,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    }
    this.props.onLocationPick({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
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
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={ref => (this.map = ref)}
        >
          {marker}
        </MapView>
        <View style={styles.button}>
          <Button
            title="Use current location"
            onPress={this.getLocationHandler}
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
