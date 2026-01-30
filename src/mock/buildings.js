/**
 * Mock Buildings Data
 * 
 * Contains building and flat information
 */

export const buildings = [
  {
    id: 'building_001',
    societyId: 'society_001',
    name: 'Tower A',
    code: 'A',
    totalFloors: 10,
    flatsPerFloor: 4,
    totalFlats: 40,
    hasElevator: true,
    parkingSlots: 50,
    createdAt: '2015-06-01T10:00:00Z',
  },
  {
    id: 'building_002',
    societyId: 'society_001',
    name: 'Tower B',
    code: 'B',
    totalFloors: 12,
    flatsPerFloor: 4,
    totalFlats: 48,
    hasElevator: true,
    parkingSlots: 60,
    createdAt: '2015-06-01T10:00:00Z',
  },
  {
    id: 'building_003',
    societyId: 'society_001',
    name: 'Tower C',
    code: 'C',
    totalFloors: 15,
    flatsPerFloor: 4,
    totalFlats: 60,
    hasElevator: true,
    parkingSlots: 75,
    createdAt: '2016-03-15T10:00:00Z',
  },
];

// Generate flats for a building
const generateFlats = (building) => {
  const flats = [];
  for (let floor = 1; floor <= building.totalFloors; floor++) {
    for (let unit = 1; unit <= building.flatsPerFloor; unit++) {
      const flatNumber = `${building.code}-${floor}0${unit}`;
      flats.push({
        id: `flat_${building.code}_${floor}${unit}`,
        buildingId: building.id,
        buildingName: building.name,
        flatNumber,
        floor,
        unit,
        type: unit <= 2 ? '3BHK' : '2BHK',
        area: unit <= 2 ? 1800 : 1200,
        isOccupied: Math.random() > 0.2, // 80% occupied
        residentId: null, // Would be linked to resident
      });
    }
  }
  return flats;
};

// All flats across all buildings
export const flats = buildings.flatMap(building => generateFlats(building));

// Get building by ID
export const getBuildingById = (id) => {
  return buildings.find(building => building.id === id);
};

// Get buildings by society
export const getBuildingsBySociety = (societyId) => {
  return buildings.filter(building => building.societyId === societyId);
};

// Get flats by building
export const getFlatsByBuilding = (buildingId) => {
  return flats.filter(flat => flat.buildingId === buildingId);
};

// Get flat by number
export const getFlatByNumber = (buildingCode, flatNumber) => {
  return flats.find(flat => 
    flat.flatNumber === flatNumber || 
    flat.flatNumber === `${buildingCode}-${flatNumber}`
  );
};

// Get floors for a building
export const getFloorsByBuilding = (buildingId) => {
  const building = getBuildingById(buildingId);
  if (!building) return [];
  
  return Array.from({ length: building.totalFloors }, (_, i) => ({
    floor: i + 1,
    label: `Floor ${i + 1}`,
  }));
};

// Get flats for a specific floor
export const getFlatsByFloor = (buildingId, floor) => {
  return flats.filter(flat => flat.buildingId === buildingId && flat.floor === floor);
};

export default {
  buildings,
  flats,
  getBuildingById,
  getBuildingsBySociety,
  getFlatsByBuilding,
  getFlatByNumber,
  getFloorsByBuilding,
  getFlatsByFloor,
};