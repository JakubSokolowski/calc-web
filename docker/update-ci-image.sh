DOCKER_HUB_ID="jsokolowski"
IMAGE_TAG_BASE="calc-ci"
VERSION="latest"

docker build -t "$IMAGE_TAG_BASE" . -f ci-base.dockerfile
docker login
docker tag $IMAGE_TAG_BASE:$VERSION $DOCKER_HUB_ID/$IMAGE_TAG_BASE:$VERSION
docker push $DOCKER_HUB_ID/$IMAGE_TAG_BASE:$VERSION
