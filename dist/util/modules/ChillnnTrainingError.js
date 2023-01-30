"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChillnnTrainingError = void 0;
const type_1 = require("../../entities/type");
class ChillnnTrainingError extends Error {
    constructor(errCode, err) {
        super(errCode);
        this.chillnnErrorCode = errCode;
        this.err = err;
    }
    getMessage() {
        return errorMessages[this.chillnnErrorCode] || errorMessages[type_1.ErrorCode.chillnnTraining_500_systemError];
    }
}
exports.ChillnnTrainingError = ChillnnTrainingError;
const errorMessages = {
    chillnnTraining_401_notSignIn: 'サインインしていません',
    chillnnTraining_403_resourceAccessDenied: 'リソースへのアクセスが拒否されました',
    chillnnTraining_404_resourceNotFound: 'リソースが見つかりません',
    chillnnTraining_500_systemError: 'システムエラーです',
};
