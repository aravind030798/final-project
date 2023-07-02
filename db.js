import { MongoClient } from "mongodb";

export async function connect_to_cluster() {
  const URI =
    "mongodb+srv://teddjuma21:ng8H5sATLolYOtfb@cluster0.1hbo9rz.mongodb.net/?retryWrites=true&w=majority";
  const mongo_client = new MongoClient(URI);
  console.log("Connecting to MongoDB atlas cluster");
  await mongo_client.connect();
  console.log("Successfully connected");

  return mongo_client;
}

function generateRandom(min = 0, max = 100) {
  // find diff
  let difference = max - min;
  // generate random number
  let rand = Math.random();
  // multiply with difference
  rand = Math.floor(rand * difference);
  // add with min value
  rand = rand + min;
  return rand;
}

function seeed_player(name) {
  return {
    name: name,
    catches_made: generateRandom(0, 10),
    made_field_goals: generateRandom(0, 50),
    missed_field_goals: generateRandom(0, 100),
    rushing_yards: generateRandom(100, 500),
    sacks: generateRandom(0, 20),
    touchdowns_thrown: generateRandom(0, 10),
  };
}

const PLAYERS = [
  "De Gea",
  "Harrison",
  "Heaton",
  "Vitek",
  "Bennett",
  "Dalot",
  "Fredricson",
  "Hardley",
  "Jsones",
  "Lindelof",
  "Maguire",
  "Malacia",
  "Marc Jurado",
  "Martial",
  "Rashford",
  "Sancho",
];

async function update_players(client) {
  const modified_count = await client
    .db("football")
    .collection("manu")
    .insertMany(PLAYERS.map((x) => seeed_player(x)));

  console.log(modified_count);
}

async function main() {
  const client = await connect_to_cluster();

  const result = await client
    .db("football")
    .collection("manu")
    .find()
    .toArray();

  //update_players(client);

  //Query mongo
  //1.The player with the most touchdown passes

  const player_with_most_touch_down = await client
    .db("football")
    .collection("manu")
    .find()
    .sort({ touchdowns_thrown: -1 })
    .limit(1)
    .toArray();
  // .sort({ touchdowns_thrown: -1 })
  // .limit(1);

  console.log("---------------------------------------------------");
  console.log("Player with most touchdowns");
  console.log(player_with_most_touch_down);

  //2. The player with most rushing yards
  const player_with_most_rushing_yards = await client
    .db("football")
    .collection("manu")
    .find()
    .sort({ rushing_yards: -1 })
    .limit(1)
    .toArray();

  console.log("---------------------------------------------------");
  console.log("Player with most rushing yards");
  console.log(player_with_most_rushing_yards);
  // console.log(most_touch_downs);

  //3. The player with least rushing yards
  const player_with_least_rushing_yards = await client
    .db("football")
    .collection("manu")
    .find()
    .sort({ rushing_yards: +1 })
    .limit(1)
    .toArray();

  console.log("---------------------------------------------------");
  console.log("Player with the least rushing yards");
  console.log(player_with_least_rushing_yards);

  const players_with_most_to_fewest_goals = await client
    .db("football")
    .collection("manu")
    .find()
    .sort({ made_field_goals: +1 })
    .toArray();

  console.log("---------------------------------------------------");
  console.log("Most to fewest goals");
  console.log(players_with_most_to_fewest_goals);

  const player_with_most_number_of_sacks = await client
    .db("football")
    .collection("manu")
    .find()
    .sort({ sacks: -1 })
    .limit(1)
    .toArray();

  console.log("---------------------------------------------------");
  console.log("Player with most number of sacks");
  console.log(player_with_most_number_of_sacks);
}
