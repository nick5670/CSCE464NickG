export class Room{

    id!: number;
    numPeople!: number;
    name!: string;
    capacity!: number
    picture!: string;
    isOpen!: Boolean;
    bookedRoomDetails!: Array<string>;
    date!: string;


    static fromHttp(room: Room)
    {
        const newRoom= new Room();
        newRoom.id = room.id;
        newRoom.name = room.name;
        newRoom.isOpen = room.isOpen;
        newRoom.numPeople = room.numPeople;
        newRoom.capacity= room.capacity;
        newRoom.bookedRoomDetails = room.bookedRoomDetails;
        newRoom.date=room.date;
        return newRoom;
    } 
}
