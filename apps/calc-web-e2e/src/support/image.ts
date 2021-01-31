import path from 'path';

const downloadsFolder = 'downloads';

export function validateImage(downloadedFilename: string) {
    const downloadPath = path.join(downloadsFolder, downloadedFilename);

    cy.readFile(downloadPath, 'binary', { timeout: 15000 })
        .should((buffer) => {
            expect(buffer.length).to.be.gt(1000);
        });
}
