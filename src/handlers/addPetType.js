const PetType = require('../database/models/pet-type');
const PetProperty = require('../database/models/pet-type-property');
const db = require('../database/postgres/db-context');

module.exports = async (req, h) => {
  let properties = [];

  req.payload.properties.array.forEach(property => {
    properties.push(
      new PetProperty(
        property.name,
        property.value,
        property.weight,
        property.valuePerType
      )
    );
  });

  const petType = new PetType(req.body.name, properties);

  await db.addPetType(petType, req);

  const ids = db.getPetTypeByName(petType.name);

if (!ids) {
  const petTypeId = ids[0];
  petType.properties.forEach(property => {
    property.petTypeId = petTypeId;
    await db.addPetProperty(property, req);
  })
}
};
