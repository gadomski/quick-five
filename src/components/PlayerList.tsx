import { VStack } from "@chakra-ui/react";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PlayerCard } from "./PlayerCard";
import { Player } from "../types/game";
import { useGameStore } from "../store/gameStore";

function SortablePlayerCard({ player }: { player: Player }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: player.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <PlayerCard player={player} />
    </div>
  );
}

export function PlayerList() {
  const players = useGameStore((state) => state.players);
  const reorderPlayers = useGameStore((state) => state.reorderPlayers);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderPlayers(active.id as string, over.id as string);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={players.map((p) => p.id)}
        strategy={verticalListSortingStrategy}
      >
        <VStack gap={4} align="stretch">
          {players.map((player) => (
            <SortablePlayerCard key={player.id} player={player} />
          ))}
        </VStack>
      </SortableContext>
    </DndContext>
  );
}
