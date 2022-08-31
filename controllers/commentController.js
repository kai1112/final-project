const CommentModel = require('../models/comment.model')

module.exports.createComment = async (req, res) => {
    try {
        let audio;
        let mimeType;
        if (req.file == undefined) {
            audio = "";
            mimeType = "";
            // console.log(25, audio, mimeType);
        } else {
            audio = "/" + req.file.path;
            mimeType = req.file.mimetype;
            console.log(audio, mimeType);
        }

        let commet = await CommentModel.create({
            userID: req.user._id,
            chapterID: req.body.chapterId,
            title: req.body.comments,
            audio: audio,
            mimeType: mimeType,
            reaction: [],
        })
        res.json({ status: 200 })
    } catch (err) {
        res.json(err)
    }
}

module.exports.updateComment = async (req, res) => {
    try {
        let comment = await CommentModel.findOne({ _id: req.body.id });
        if (comment) {
            let reaction = comment.reactions
            for (let i = 0; i < comment.reaction.length; i++) {
                if (comment.reaction[i] === req.user._id) {
                    reaction.splice(i, 1);
                } else {
                    reaction.push(req.user._id);
                }
            }
            let updateComment = await CommentModel.findOneAndUpdate({ _id: comment._id }, { reaction: reaction });
        } else {
            console.log('Comment not found');
        }
    } catch (err) {
        res.json(err)
    }
}


module.exports.deleteComment = async (req, res) => {
    try {
        let comment = await CommentModel.findOne({ _id: req.body.id });
        // console.log(comment);
        if (comment.userID === req.user._id) {
            await CommentModel.findByIdAndDelete(comment._id);
            fs.unlinkSync(comment.audio.slice(1));
            res.json("deleteComment success");
        } else {
            res.json("manga not found");
        }
    } catch (err) {
        res.json(err);
    }
};