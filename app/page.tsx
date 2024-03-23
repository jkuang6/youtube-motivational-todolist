
import AddItem from "@/components/shared/AddItem";
import ToDo from "@/components/shared/ToDo";
import VideoPlayer from "@/components/shared/VideoPlayer";
import { prisma } from "@/utils/prisma";
import { fetchVideos } from "@/app/API/youtubeAPI";
import { updateStorageVideo, getVideoFromStorage, videoStorageLength, createVideoStorage } from "@/app/Actions/storeLastVideoActions";
import { checkDatabaseLength, popVideo } from "@/app/Actions/videoActions";
import { deleteAllToDos, getAllToDos } from "./Actions/todoActions";

// global variables
const schedule = require('node-schedule');
const tasks = ["Workout", "Physical Therapy","Coding",]; // list of daily tasks
let initialized = false;  // initialization status

// add daily set of tasks
async function addDailyTasks() {
  for (const task of tasks) {
    await prisma.todo.create({
      data: {
        title: task
      }
    });
  }
}

// update last video link
// pop current video in database and then save that link 
// if the database no longer has videos, we can fetch videos to get a new set
export async function updateVideo() {
  let _videoItem = await popVideo();
  await updateStorageVideo(_videoItem.video);
  if (await checkDatabaseLength() === 0){
    await fetchVideos();
  }
}

// Set up a scheduled task to run every day at 12:00 AM
const rule = new schedule.RecurrenceRule();
rule.hour = 0; 
rule.minute = 0;
rule.second = 0;

// Create the scheduled task
const job = schedule.scheduleJob(rule, async function() {

  // if the database is not initialized with a endpoint with a list of videos nor does it have a endpoint of a last video
  // we create those 2 endpoints
  // otherwise, we just update the last video link, delete all current tasks (if any) and then we add the daily tasks
  if (!initialized && await checkDatabaseLength() < 1 && await videoStorageLength() <1){
    await fetchVideos(); 
    await createVideoStorage("");
  }
    await updateVideo();
    await deleteAllToDos();
    await addDailyTasks();
});

const Home = async() => {

  const data = await getAllToDos(); // grab all todo datas
  let video = await getVideoFromStorage(); // grab video from lastvideo storage

  return (
    <div className="w-screen flex justify-center flex-col items-center">
      <div className="flex justify-center flex-col items-center mt-10">
        <VideoPlayer currentVideo={video} />
      </div>
      <span className="text-3xl font-extrabold uppercase py-5">
        Motivational Daily To-Do Tracker
      </span>
      <div className="flex justify-center flex-col items-center w-[1000px]">
        <AddItem/>
        <div className="flex flex-col gap-5 items-center justify-center mt-10 w-full">
          {data?.map((todo, id) => (
            <div key={id} className="w-full">
              <ToDo todo={todo}/>  
            </div>
          ))}
        </div>
      </div>
    </div>   
  );
};

export default Home;
