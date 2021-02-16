import {
  Orchestrator,
  Config,
  InstallAgentsHapps,
  TransportConfigType,
  Player,
} from "@holochain/tryorama";
import path from "path";

const conductorConfig = Config.gen({});

// Construct proper paths for your DNAs
const calendarEvents = path.join(__dirname, "../../todo_rename_zome.dna.gz");

const sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

const orchestrator = new Orchestrator();

// create an InstallAgentsHapps array with your DNAs to tell tryorama what
// to install into the conductor.
const installation: InstallAgentsHapps = [
  // agent 0
  [
    // happ 0
    [calendarEvents],
  ],
  [
    // happ 0
    [calendarEvents],
  ],
];

const dateToTimestamp = (date) => [
  Math.floor(date / 1000),
  (date % 1000) * 1000,
];

orchestrator.registerScenario(
  "create and get a calendar event",
  async (s, t) => {
    const [player]: Player[] = await s.players([conductorConfig]);
    const [[alice_happ], [bob_happ]] = await player.installAgentsHapps(
      installation
    );

    const alice_calendar = alice_happ.cells[0];
    const bob_calendar = bob_happ.cells[0];

    let calendarEvent = await alice_calendar.call(
      "todo_rename_zome",
      "create_calendar_event",
      {
        title: "Event 1",
        start_time: [Math.floor(Date.now() / 1000), 0],
        end_time: [Math.floor(Date.now() / 1000) + 1000, 0],
        location: { Custom: "hiii" },
        invitees: [],
      }
    );
    t.ok(calendarEvent);

    await sleep(10);

    let calendarEvents = await alice_calendar.call(
      "todo_rename_zome",
      "get_all_calendar_events",
      null
    );
    t.equal(calendarEvents.length, 1);

  }
);

orchestrator.run();
