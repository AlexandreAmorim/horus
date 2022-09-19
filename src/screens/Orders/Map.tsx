import React, { useEffect, useState } from "react";
import { HStack, Spinner, Heading } from "native-base";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, Dimensions } from "react-native";
import { Button } from "../../components/Button";

interface ICoords {
  latitude: any;
  longitude: any;
  latitudeDelta: any;
  longitudeDelta: any;
}

interface IForm {
  handleCoord(coord: ICoords): void;
}

export function Map({ handleCoord }: IForm) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [initialRegion, setInitialRegion] = useState<ICoords>({} as ICoords);
  const [isShowMap, setIsShowMap] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      /* let location = await Location.getCurrentPositionAsync({});
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            */
      setInitialRegion({
        latitude: -22.594693780123222,
        longitude: -43.2820068068848,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setIsShowMap(true);
    })();
  }, []);

  let text = "Carregando...";

  if (errorMsg) {
    text = errorMsg;
  }

  return (
    <>
      {!isShowMap && (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {text}
          </Heading>
        </HStack>
      )}
      {isShowMap && (
        <>
          <MapView style={styles.map}>
            <Marker coordinate={initialRegion} />
          </MapView>
          <HStack space="2xl">
            <Button title="Cancelar" mt="7" w="120" bg="gray.300" />
            <Button
              title="Confirmar"
              mt="7"
              w="120"
              onPress={() => {
                handleCoord(initialRegion);
              }}
            />
          </HStack>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    backgroundColor: "#fff",
    width: Dimensions.get("window").width / 1.5,
    height: Dimensions.get("window").height / 2,
  },
});
