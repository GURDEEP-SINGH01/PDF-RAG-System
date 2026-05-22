export const retrieveNode = async (state) => {
    const lastMessage = state.messages[state.messages.length - 1];
    const question = lastMessage.content;
    // search vector DB
    const docs =
        await retriever.invoke(question);

    // save docs into graph state
    return {
        retrievedDocs: docs
    };
}

export const generateNode = () => {

}