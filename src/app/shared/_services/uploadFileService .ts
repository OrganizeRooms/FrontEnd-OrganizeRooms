import { Injectable } from '@angular/core';

import * as AWS from 'aws-sdk/global';
import * as S3a from 'aws-sdk/clients/s3';
import { resolve } from 'path';
import { reject } from 'q';

@Injectable()
export class UploadFileService {

    constructor() { }

    FOLDER = 'blucake';

    promisse;

    async uploadfile(file) {

        const bucket = new S3a(
            {
                accessKeyId: 'AKIA3HBBML2ROLQIU44S',
                secretAccessKey: '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',
                region: 'sa-east-1'
            }
        );

        const params = {
            Bucket: 'blucake-bucket',
            Key: this.FOLDER + file.name,
            Body: file
        };

        // tslint:disable-next-line:no-shadowed-variable
        this.promisse = new Promise((resolve, reject) => {
            bucket.upload(params, function (err, data) {
                if (err) {
                    console.log('There was an error uploading your file: ', err);
                    reject(data.Location);
                }
                console.log('Successfully uploaded file.', data);
                resolve(data.Location);
            });
        });

        return this.promisse;
    }

}
