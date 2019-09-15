function Message(Owner, Date, Text) {
    this._owner = Owner;        // user.js
    this._date = Date;
    this._text = Text;

    this.getMessage = () => {
        return {
            _owner: this._owner,
            _date: this._date,
            _text: this._text
        };
    };
};

// module.exports.Message = Message;