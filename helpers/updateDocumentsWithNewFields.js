exports.updateDocumentsWithNewFields = async (Model, documents, newFields) => {
  try {
    const updatedDocuments = [];
    for (const document of documents) {
      const updatedDocument = { ...document._doc, ...newFields };
      const updated = await Model.findByIdAndUpdate(
        document._id,
        updatedDocument,
        { new: true }
      );
      updatedDocuments.push(updated);
    }
    return updatedDocuments;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update documents");
  }
};
