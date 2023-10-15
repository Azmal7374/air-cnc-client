import { useContext, useEffect, useState } from "react";
import Container from "../Shared/Container";
import Card from "../Card/Card";
import { AuthContext } from "../../providers/AuthProvides";
import Loader from "../Shared/Loader";
import { useSearchParams } from "react-router-dom";
import Heading from "../Heading/Heading";
import { getAllRooms } from "../../api/rooms";
import { data } from "autoprefixer";

const Rooms = () => {
  const [params, setParams] = useSearchParams();
  const category = params.get("category");
  console.log(category);
  const {loading, setLoading } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    setLoading(true);
    // fetch("./rooms.json")
    //   .then((res) => res.json())
    //   .then(data => setRooms(data))
    getAllRooms()
      .then((data) => {
        // console.log(data)
        // console.log(data)
        if (category) {
          // console.log('hello')
          const filtered = data?.filter((room) => room.category === category);
          setRooms(filtered);
        } else {
          setRooms(data);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, [category]);

 console.log(rooms)

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <Container>
     
      {rooms && rooms.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl-grid-cols-6 gap-8">
          {rooms.map((room, index) => (
            <Card key={index} room={room}></Card>
          ))}
        </div>
      ) : (
        <div className="min-h-[calc(100vh-300px)] flex items-center justify-center">
          <Heading
           title="No Room Available In This Category!"   subtitle="Please Select Other Categories" center={true}>
         
          </Heading>
        </div>
      )}
    </Container>
  );
};

export default Rooms;
