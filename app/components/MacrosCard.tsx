import { Card, CardProps, Paragraph, Progress} from "tamagui";
import { FlatList, Text, View } from "react-native";  

export function MacrosCard(props: CardProps) {
  return (
    <Card size="$12" padding={10} {...props} >
      <Card.Header style={{ marginBottom: 0, paddingBottom: 0, paddingTop: 10}}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}> Macro Targets</Text>
        <Paragraph style={{alignContent: "center", textAlign: "center", textDecorationLine: "underline"}}>Tap to adjust</Paragraph>
      </Card.Header> 
      <View style={{flexDirection: "column", justifyContent: "space-between", padding: 10, height: 125}}> 
        <FlatList
          data={[
            {key: "Protein", amount: "150g / 200g", percentage: "75%"}, 
            {key: "Carbs", amount: "250g / 300g", percentage: "83%"}, 
            {key: "Fats", amount: "70g / 80g", percentage: "88%"}
          ]} 
          scrollEnabled={false}
          renderItem={({item}) => {
            return (
              <View style={{
                margin: 2
              }}>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 5}}> 
                  <Text> {item.key} </Text>
                  <Text> {item.amount} </Text>
                  <Text> {item.percentage} </Text>
                </View>
                <Progress key={item.key} size={"$1"} value={parseInt(item.percentage)}>
                  <Progress.Indicator animation="bouncy" />
                </Progress>
              </View>
            );
          }}
          keyExtractor={item => item.key} 
        /> 
      </View>
    </Card>
  );
}